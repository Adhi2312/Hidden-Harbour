from django.contrib import admin
from  .models import *

# Register your models here.

admin.site.register(Question)
admin.site.register(Answers)
admin.site.register(LikeAns)
admin.site.register(LikeQus)
admin.site.register(ReportAns)
admin.site.register(ReportQus)
admin.site.register(RandUserName)
admin.site.register(Profile)