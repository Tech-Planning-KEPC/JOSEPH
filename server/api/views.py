from datetime import datetime
import json
import os
from time import strptime
from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import gspread
from google.oauth2.service_account import Credentials


class ItemListAPIView(APIView):
    def get(self, request):
        queryset = Item.objects.all()
        serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data)


class UploadAPIView(APIView):
    def post(self, request):
        data = request.data
        response_data = []
        for row in data:
            tag_id = row.get('tagId')
            try:
                item = Item.objects.get(tag_id=tag_id)
            except Item.DoesNotExist:
                if tag_id is not None and tag_id != '':
                    item = Item.objects.create(
                        tag_id=row.get('tagId'),
                        department=row.get('department', ''),
                        committee=row.get('committee', ''),
                        manager=row.get('manager', ''),
                        email=row.get('email', ''),
                        phone=row.get('phone', ''),
                        category=row.get('category', ''),
                        name=row.get('name', ''),
                        brand=row.get('brand', ''),
                        model=row.get('model', ''),
                        serial='',
                        price=row.get('unitPrice', ''),
                        tax=0.0,
                        bought_at=datetime.strptime(
                            row.get('purchaseDate'), "%d/%m/%Y").date(),
                        note=row.get('note', '')
                    )
                    response_data.append(ItemSerializer(item).data)

        return Response({"saved data": response_data}, status=status.HTTP_200_OK)


class ScanAPIView(APIView):
    def post(self, request):
        scan_data = request.data
        for row in scan_data:
            print(row)

        return Response({"message": "good"}, status=status.HTTP_200_OK)


class ExportGsAPIView(APIView):
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
    SPREADSHEET_ID = '1o9OqsjPJZz4UI9z77e9bd6W-03cLiyN_pUVxyogZZFo'
    TOKEN_PATH = os.path.join(os.getcwd(), 'api/google-sheet-api-token.json')

    def export_data_to_sheets(self):

        with open(self.TOKEN_PATH, 'r') as file:
            service_account_info = json.load(file)

        creds = Credentials.from_service_account_info(
            service_account_info, scopes=self.SCOPES)
        client = gspread.authorize(creds)

        sheet = client.open_by_key(self.SPREADSHEET_ID)

        fields = [field.name for field in Item._meta.get_fields()]
        items = Item.objects.all()
        values_list = [
            fields] + [[str(value) for value in item.values()] for item in items.values()]

        sheet.sheet1.clear()
        sheet.sheet1.update(values_list)

    def get(self, request):
        self.export_data_to_sheets()
        return Response({"message": "Data exported successfully."})


class ScanAPIView(APIView):
    def post(self, request):
        csv_tag_ids = [row[0] for row in request.data]
        print(csv_tag_ids)

        if not csv_tag_ids:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        # for row in reader:
        #     tag_id = row.get('tagId')
        #     if tag_id:
        #         csv_tag_ids.add(tag_id)

        db_tag_ids = set(Item.objects.values_list('tag_id', flat=True))

        missing_tag_ids = csv_tag_ids - db_tag_ids

        response_data = {
            "missing_tag_ids": list(missing_tag_ids),
        }

        return Response(response_data, status=status.HTTP_200_OK)
