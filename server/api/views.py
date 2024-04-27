from rest_framework import generics
from .models import Category, Department, Item
from .serializers import CategorySerializer, DepartmentSerializer, ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class DepartmentListAPIView(generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class ItemListAPIView(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class UploadAPIView(APIView):
    def post(self, request):
        file = request.data['file']
        print(file)
        return Response({"data": file}, status=status.HTTP_200_OK)
