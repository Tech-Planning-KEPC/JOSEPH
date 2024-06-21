from datetime import datetime
from time import strptime
from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd


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
                print(item)
            except Item.DoesNotExist:
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
