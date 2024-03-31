from rest_framework import serializers
from .models import Question, Answers, ReportQus, Profile
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime, timezone, timedelta

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= ['id','username', 'password', 'email']

class QuestionSerializer(serializers.ModelSerializer):
    user = UserSerializer(Question.user, many=False)
    class Meta:
        model= Question
        fields= '__all__'
        # fields = ['id','question', 'public','user','created', 'showOthersAns','showAuthorName', 'responses', 'LikeCount']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields= '__all__'
        ordering = ['created']

class ReportQusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportQus
        fields=['qus_id']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(Profile.user, many=False)
    class Meta:
        model = Profile
        fields='__all__'