from modeltranslation.translator import register, TranslationOptions
from .models import Event, Post

@register(Event)
class EventTranslationOptions(TranslationOptions):
    fields = ('title', 'description')

@register(Post)
class PostTranslationOptions(TranslationOptions):
    fields = ('title', 'content')
