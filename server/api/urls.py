from django.urls import path
from .views import ItemListAPIView, UploadAPIView, ScanAPIView

urlpatterns = [
    path('items/', ItemListAPIView.as_view(), name='item-list'),
    path('upload/', UploadAPIView.as_view()),
    path('scan/', ScanAPIView.as_view())
]
