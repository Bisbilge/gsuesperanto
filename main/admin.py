from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from .models import Event, Post

@admin.register(Event)
class EventAdmin(TranslationAdmin):
    list_display = ('title', 'date', 'location', 'published')
    list_filter = ('published',)
    list_editable = ('published',)
    ordering = ('date',)

@admin.register(Post)
class PostAdmin(TranslationAdmin):
    list_display = ('title', 'created_at', 'published')
    list_filter = ('published',)
    list_editable = ('published',)
