from django.shortcuts import render 
from .serializers import *
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from googleapiclient import discovery
from django.db.models import Q
import json
from django.utils import timezone
from datetime import datetime, timezone, timedelta
import random

name = [
    "WhisperWave",
    "ShadowTalker",
    "SilentCipher",
    "GhostWhisperer",
    "StealthMessenger",
    "IncognitoEcho",
    "PhantomNote",
    "MaskedThought",
    "CrypticMingle",
    "EnigmaSignal",
    "VeiledWhisper",
    "NebulaNudge",
    "AnonymousRipple",
    "MutedPulse",
    "SecretBreeze",
    "EchoShroud",
    "StealthPilot",
    "ShadeHarbor",
    "SilentCipher",
    "MysteryWanderer",
    "VeilVoyager",
    "CipherCrafter",
    "SilentPulse",
    "NebulaNomad",
    "ShadowHarmony",
    "StealthWanderer",
    "WhispersUnseen",
    "GhostlyGrove",
    "SereneShroud",
    "TranquilHush",
    "IncognitoMingle",
    "MaskedVoyage",
    "EnigmaticWisp",
    "SecretSculptor",
    "MutedMurmur",
    "AnonymousSculpt",
    "EchoExplorer",
    "CrypticPioneer",
    "WhisperingNomad",
    "MirageRoamer"
]

def random_names(user_id, ques_id):
    tt = user_id + ques_id
    kk = str(int(tt / 3)*456)
    if (len(kk) > 3):
         tri = int(kk[-3:])
    return random.choice(name) + "_" + str(tri)

def create(given_date_str):
    # print(given_date_str)
    given_date = datetime.fromisoformat(given_date_str)

    current_date = datetime.utcnow().replace(tzinfo=timezone.utc)

    time_difference = current_date - given_date

    days = time_difference.days
    hours, remainder = divmod(time_difference.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)

    if days!=0:
        return str(days)+'d'
    elif hours!=0:
        return str(hours)+'h'
    elif minutes!=0:
        return str(minutes)+'m'
    else:
        return '1m'

def perpective_api(text):
    API_KEY = 'AIzaSyDG9jjcvg0UKaDkc3shz6wM9CaAzC97QkY'
    client = discovery.build(
    "commentanalyzer",
    "v1alpha1",
    developerKey=API_KEY,
    discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
    static_discovery=False,
    )
    analyze_request = {
    'comment': { 'text': text},
    'requestedAttributes': {'TOXICITY': {}}
    }

    response = client.comments().analyze(body=analyze_request).execute()
    return response["attributeScores"]["TOXICITY"]['summaryScore']['value'] * 200

@api_view(['GET'])
def searchQ(request,qus,uk,sk):
    # print(qus,uk)
    qu=[]
    if sk=='0':
        qu = Question.objects.filter(Q(question__icontains = qus))
    else:
        qu = Question.objects.filter(Q(question__icontains = qus),user_id=uk)
    # print(qu)
    lk = LikeQus.objects.filter(user = uk).values_list('qus_id', flat = True)
    ser = QuestionSerializer(qu, many=True).data
    rep = ReportQus.objects.filter(user_id = uk).values_list('qus_user_id', flat = True)
    for i in ser:
        if i['id'] in rep:
            ser.remove(i)
            continue
        if i['id'] in lk:
            i['like'] = True
        else:
            i['like'] = False
        i['created'] = create(i['created'])
        if i['showAuthorName']==False:
            i['user']['username']='Anonymous'
    # print(ser)
    return Response(ser)

@api_view(['POST'])
def login(request):
    # print("In login page...")
    user =  get_object_or_404(User, username = request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail":'Not Found',}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user = user)
    serializer = UserSerializer(instance = user)
    img = Profile.objects.get(user = user).Profile_image
    return Response({'Token':token.key, 'user':serializer.data,"img":img})

@api_view(['POST'])
def SignUp(request):
    serializer = UserSerializer(data = request.data['user'])
    if serializer.is_valid():
        serializer.save()
        user=User.objects.get(username=request.data['user']['username'])
        user.set_password(request.data['user']['password'])
        user.save()
        pr = Profile.objects.create(
            user=user,
            Profile_image=request.data['img']
        )
        pr.save()

        token = Token.objects.create(user=user)
        return Response({"Sucess":1,'Token':token.key, 'user':serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def testToken(request):
    return Response()

@api_view(['GET'])
def listQus(request,pop,uk):
    if(uk=="null"):
        return Response()
    qus= Question.objects.all()
    lk = LikeQus.objects.filter(user = uk).values_list('qus_id', flat = True)
    ser = QuestionSerializer(qus, many=True).data
    rep = ReportQus.objects.filter(user_id = uk).values_list('qus_user_id', flat = True)
    # print(ser)
    for i in ser:
        if i['id'] in rep:
            ser.remove(i)
            continue
        i['created'] = create(i['created'])
        if i['id'] in lk:
            i['like'] = True
        else:
            i['like'] = False
        # print(i['created'])
        if i['showAuthorName']==False:
            i['user']['username']='Anonymous'
    if pop == '0':
        ser = sorted(ser, key=lambda x: x['LikeCount']+x['responses'], reverse= True)
    return Response(ser)

@api_view(['POST'])
def answer(request,pk):
    if request.method =='POST':
        user = request.data['user']
        qus = Question.objects.get(id = pk)
        answers = Answers.objects.filter(question_id=pk, private = False)
        ans = AnswerSerializer(answers, many=True).data
        like = LikeAns.objects.filter(qus_id = pk, user_id= user ).values_list('ans_id', flat=True)
        rep = ReportAns.objects.filter(user = user).values_list("ans_user_id", flat=True)
        a=[]
        if(qus.user_id == user ):
            an = Answers.objects.filter(question_id=pk, private = True)
            a = AnswerSerializer(an,many=True).data
            # print("--------------a--------------",a)
        ans = a+ans
        # print("------------------ans-------------------:",ans)
        for i in ans:
            if i['id'] in rep:
                ans.remove(i)
            i['username'] = RandUserName.objects.get(question_id=pk, user_id=i['user']).rand_userName +("(Private)" if(i['private']) else "")
                # print(i['id'],i['user'])
            i['created'] = create(i['created'])
            if i['id'] in like:
                i['like']=True
            else:
                i['like']=False
        return Response({"answer":ans})
    return Response("erro")

@api_view(['POST'])
def create_question(request):
    data = request.data
    user = User.objects.get(id = data['user'])
    try:
        score = perpective_api(data['question'])
        # print(score)
    except:
        score = 160
    if (score>180):
        return Response("Sensitive message")
    qus = Question.objects.create(
        question = data['question'],
        user = user,
        showOthersAns = data['showAns'],
        showAuthorName = data['showAuthor'],
        allowPrivateMessages = data['privateMessages'],
        score = score
    )
    pro = Profile.objects.get(user =user)
    pro.questions += 1
    pro.Honour_score = qus.score//(pro.questions*5)
    pro.save()
    return Response("Sucessful", status=200)

@api_view(['POST'])
def create_answer(request,pk,uk):
    data = request.data
    # print(data)
    try:
        score = perpective_api(data['answer'])
    except:
        score = 160
    if (score>180):
        return Response("Sensitive message")
    qus = Question.objects.get(id=pk)
    ans = Answers.objects.filter(question=qus)
    # qus.responses = len(ans)
    qus.responses +=1
    qus.save()
    Answers.objects.create(
        answer = data['answer'],
        private = data['private'],
        user_id = uk,
        question_id = pk ,
        score = score
    )
    try:
        RandUserName.objects.get(user_id=uk,question_id=pk)
    except:
        RandUserName.objects.create(
            user_id = uk,
            question_id = pk,
            rand_userName=random_names(int(uk),int(pk))
        )
    return Response("Sucessful")

@api_view(['GET'])
def ans_Report (request,pk,uk):
    data = Answers.objects.get(id = pk)
    data.score+=2
    data.save()

    ais = User.objects.get(id = uk)
    ReportAns.objects.create(user = ais, ans_user = data)

    if (data.score > 180):
        data.delete()
    return Response("")

@api_view(['GET'])
def qus_Report(request,pk,uk):
    # print(qk)
    data = Question.objects.get(id = pk)
    data.score+=2
    data.save()

    if (data.score > 180):
        data.delete()
        return Response("")

    uis = User.objects.get(id = uk)
    ReportQus.objects.create(user = uis, qus_user = data)

    pro= Profile.objects.get(user_id=uk)
    pro.Honour_score = (data.score/2)//(pro.questions*5)
    print(pro.Honour_score,data.score,pro.questions)
    pro.save()
    return Response("")


@api_view(['GET'])
def ans_like(request,pk,uk,qk):
    data = Answers.objects.get(id = pk)
    data.score-=1
    data.LikeCount+=1
    data.save()
    # print(data.LikeCount)
    # print("hi")
    ques_inst = Question.objects.get(id = qk)
    user_inst = User.objects.get(id = uk)
    like_ans = LikeAns.objects.create(user=user_inst, ans=data, qus=ques_inst)
    return Response("")

@api_view(['GET'])
def ans_dislike(request,pk,uk,qk):
    data = Answers.objects.get(id = pk)
    data.score+=1
    data.LikeCount-=1
    data.save()

    ques_inst = Question.objects.get(id = qk)
    user_inst = User.objects.get(id = uk)
    like_ans = LikeAns.objects.filter(user=user_inst, ans=data, qus=ques_inst)
    # print(user_inst,data,ques_inst,like_ans)
    # like_ans.delete()
    return Response("")

@api_view(['GET'])
def qus_like(request,pk,uk):
    data = Question.objects.get(id = pk)
    # print(data.LikeCount)
    data.score-=1
    data.LikeCount+=1
    data.save()
    # print(data.LikeCount)
    user = User.objects.get(id = uk)
    qus_like = LikeQus.objects.create(user=user, qus = data)
    pro= Profile.objects.get(user_id=uk)
    pro.Honour_score = (data.score+10)//(pro.questions*5)
    # print(pro.Honour_score,data.score,pro.questions)
    pro.save()
    return Response("")

@api_view(['GET'])
def qus_dislike(request,pk,uk):

    data = Question.objects.get(id = pk)
    data.score+=1
    if data.LikeCount>0:
        data.LikeCount-=1
    data.save()
    qus_like = LikeQus.objects.get(user_id=uk, qus_id =pk)
    qus_like.delete()
    pro= Profile.objects.get(user_id=uk)
    pro.Honour_score = (data.score+10)//(pro.questions*5)
    pro.save()
    return Response("")

@api_view(['GET'])
def profile(request,pk):
    user = User.objects.get(id = pk)
    prof = Profile.objects.get(user = user)
    ser = ProfileSerializer(prof).data
    qus = QuestionSerializer(Question.objects.filter(user_id=pk), many=True).data
    rep=0
    lk=0
    for i in qus:
        # print(i)
        x=0
        try:
            # print(i['id'])
            x = ReportQus.objects.filter(qus_user_id = i['id']).values_list('id',flat=True)
            x = len(x)
            # print(x, type(x),"------------------------------")
        except:
            x=0
        rep += x
        try:
            x = len(LikeQus.objects.filter(qus_id = i['id']).values_list('id', flat=True))
            # print(x)
        except:
            x=0
        lk+=x

    # print(rep,lk)
    ser["reports"] = rep
    ser["like"] = lk
    return Response(ser)

@api_view(['GET'])
def deleteQus(request,pk):
    qs = Question.objects.get(id = pk)
    # print(qs.question)
    qs.delete()
    return Response("Qus deleted.")

@api_view(["GET"])
def deleteAns(request,pk,uk):
    ans = Answers.objects.get(id = pk)
    ans.delete()
    qus = Question.objects.get(id=uk)
    if qus.responses>0:
        qus.responses-=1
    return Response("Answer deleted")

@api_view(['GET'])
def userQuestion(request,pop,pk):
    user=User.objects.get(id=pk)
    questions=Question.objects.filter(user_id=pk)
    serializer=QuestionSerializer(questions,many=True).data
    # print(serializer)
    for i in serializer:
        i['created'] = create(i['created'])
    if pop == '0':
        serializer = sorted(serializer, key=lambda x: x['LikeCount']+x['responses'], reverse= True)
    return Response(serializer)
