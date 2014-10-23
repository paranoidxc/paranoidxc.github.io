---
layout: page
title: 2014 reading list
tagline: 
---
{% include JB/setup %}

<script src="https://gist.github.com/paranoidxc/9509236.js"></script>
    
## Posts Lists

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>