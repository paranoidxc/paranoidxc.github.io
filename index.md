---
layout: page
title: Purpose of life
tagline: 
---
{% include JB/setup %}


    take a break comma then thinking comma
    Knowing what you’ve got comma
    Knowing what you need comma
    Knowing what you can do without dash
    and then fucking the world exclamation
    
## Posts Lists

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>