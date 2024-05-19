from django.urls import path
from .views import ItemListAPIView, UploadAPIView

urlpatterns = [
    path('items/', ItemListAPIView.as_view(), name='item-list'),
    path('upload/', UploadAPIView.as_view())
]
