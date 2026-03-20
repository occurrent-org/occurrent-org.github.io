{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>cloudevent-converter-jackson3</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:cloudevent-converter-jackson3:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "cloudevent-converter-jackson3" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='cloudevent-converter-jackson3', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/cloudevent-converter-jackson3 "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:cloudevent-converter-jackson3:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="cloudevent-converter-jackson3" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}
