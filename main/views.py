from django.shortcuts import render
from django.utils import timezone
from .models import Event, Post

def home(request):
    upcoming_events = Event.objects.filter(published=True, date__gte=timezone.now())[:3]
    latest_posts = Post.objects.filter(published=True)[:3]
    return render(request, 'main/home.html', {
        'upcoming_events': upcoming_events,
        'latest_posts': latest_posts,
    })

def events(request):
    all_events = Event.objects.filter(published=True)
    return render(request, 'main/events.html', {'events': all_events})

def news(request):
    all_posts = Post.objects.filter(published=True)
    return render(request, 'main/news.html', {'posts': all_posts})

def about(request):
    return render(request, 'main/about.html')

def contact(request):
    return render(request, 'main/contact.html')
