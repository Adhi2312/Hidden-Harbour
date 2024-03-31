from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path
from .views import *

urlpatterns=[
    
    path("createans-like/<str:pk>/<str:uk>/<str:qk>",ans_like, name = "likeAns"),
    path("deleteans-like/<str:pk>/<str:uk>/<str:qk>",ans_dislike, name = "likeAns"),
    path("createQus-like/<str:pk>/<str:uk>",qus_like, name = "likeQus"),
    path("deleteQus-like/<str:pk>/<str:uk>",qus_dislike, name = "dislikeQus"),
    path('answers/<str:pk>',answer, name='ans-list'),
    path('create-question',create_question, name = 'create-question'),
    path('create-answer/<str:pk>/<str:uk>',create_answer, name='create-answer'),

    path('searchQus/<str:qus>/<str:uk>/<str:sk>', searchQ, name="search"),
    path('profile/<str:pk>',profile,name="Profile"),
    path('deleteQus/<str:pk>',deleteQus),
    path('deleteAns/<str:pk>/<str:uk>',deleteAns),
    path('userQus/<str:pop>/<str:pk>',userQuestion),

    path('ans-report/<str:pk>/<str:uk>',ans_Report,name = 'answers-report'),
    path('ans-like/<str:pk>/<str:uk>/<str:qk>',ans_like,name = 'answeer-like'),
    path('qus-report/<str:pk>/<str:uk>',qus_Report,name = 'question-report'),
    path('qus-like/<str:pk>/<str:uk>',qus_like,name = 'question-like'),

    path('login-user',login, name='loginToken'),
    path('signUp', SignUp, name = 'signUp'),
    path('test', testToken, name='testToken'),
    path('<str:pop>/<str:uk>',listQus,name='api'),
]