from django.urls import path
from .views import CategoryListAPIView, DepartmentListAPIView, ItemListAPIView

urlpatterns = [
    path('categories/', CategoryListAPIView.as_view(), name='category-list'),
    path('departments/', DepartmentListAPIView.as_view(), name='department-list'),
    path('items/', ItemListAPIView.as_view(), name='item-list'),
]
