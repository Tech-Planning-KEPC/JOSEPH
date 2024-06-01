import datetime
import json
from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd


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
