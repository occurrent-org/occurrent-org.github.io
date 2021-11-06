{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>spring-boot-starter-mongodb</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:spring-boot-starter-mongodb:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "spring-boot-starter-mongodb" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='spring-boot-starter-mongodb', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/spring-boot-starter-mongodb "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:spring-boot-starter-mongodb:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="spring-boot-starter-mongodb" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}