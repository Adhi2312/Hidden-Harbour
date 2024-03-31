from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import utc

class Question(models.Model):
    question=models.CharField(max_length=500)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    public=models.BooleanField(default=False)
    showOthersAns=models.BooleanField(default=True)
    showAuthorName = models.BooleanField(default=False)
    allowPrivateMessages = models.BooleanField(default=False)
    created=models.DateTimeField(auto_now_add=True)
    responses=models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    LikeCount = models.IntegerField(default=0)

    def get_time_diff(self):
        if self.created:
            now = datetime.datetime.utcnow().replace(tzinfo=utc)
            timediff = now - self.created
            return timediff.total_seconds()

    class Meta:
        ordering=['-created']
    def __str__(self):
        return self.question[:50]


class Answers(models.Model):
    user = models.ForeignKey(User,default = 1,on_delete=models.CASCADE)
    private = models.BooleanField(default=False)
    answer = models.CharField(max_length=500)
    question=models.ForeignKey(Question,on_delete=models.CASCADE)
    created= models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(default=0)
    LikeCount = models.IntegerField(default=0)
    class Meta:
        ordering=['-created']
    def __str__(self):
        return self.answer[:50]
        
class LikeAns(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    ans = models.ForeignKey(Answers, on_delete = models.CASCADE)
    qus = models.ForeignKey(Question, on_delete = models.CASCADE)

class LikeQus(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    qus = models.ForeignKey(Question, on_delete = models.CASCADE)

class RandUserName(models.Model):
    rand_userName = models.CharField(max_length=59)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    question = models.ForeignKey(Question,on_delete=models.CASCADE)

class ReportQus(models.Model):
    qus_user = models.ForeignKey(Question,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete = models.CASCADE)

class ReportAns(models.Model):
    ans_user = models.ForeignKey(Answers,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete = models.CASCADE)

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Profile_image=models.CharField(max_length=200)
    questions = models.IntegerField(default=0)
    Honour_score=models.IntegerField(default=10)