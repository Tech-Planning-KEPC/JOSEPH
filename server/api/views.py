import datetime
import json
from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import gspread
from google.oauth2.service_account import Credentials


class ItemListAPIView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class UploadAPIView(APIView):
    def post(self, request):
        data = request.data
        for row in data:
            tag_id = row.get('tagId')
            if tag_id is not None and tag_id != '':
                print(row)
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
                    bought_at=datetime.datetime.now(),
                    note=row.get('note', '')
                )
                item.save()

        return Response({"data": data}, status=status.HTTP_200_OK)

class ExportGsAPIView(APIView):
    SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
    SPREADSHEET_ID = '1o9OqsjPJZz4UI9z77e9bd6W-03cLiyN_pUVxyogZZFo'
    TOKEN_PATH = r'C:\Users\jaesu\Documents\KEPC_Tech\JOSEPH\server\api\google-sheet-api-token.json'

    def export_data_to_sheets(self):
        
        with open(self.TOKEN_PATH, 'r') as file:
            service_account_info = json.load(file)

        creds = Credentials.from_service_account_info(service_account_info, scopes=self.SCOPES)
        client = gspread.authorize(creds)

        sheet = client.open_by_key(self.SPREADSHEET_ID)

        fields = [field.name for field in Item._meta.get_fields()]
        items = Item.objects.all()
        values_list = [fields] + [[str(value) for value in item.values()] for item in items.values()]
        print(values_list)
        sheet.sheet1.clear()
        sheet.sheet1.update(values_list)

    def get(self, request):
        self.export_data_to_sheets()
        return Response({"message": "Data exported successfully."})