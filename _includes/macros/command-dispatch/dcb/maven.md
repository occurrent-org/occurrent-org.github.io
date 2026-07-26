{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-command-dispatch-dcb</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:occurrent-command-dispatch-dcb:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "occurrent-command-dispatch-dcb" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='occurrent-command-dispatch-dcb', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/occurrent-command-dispatch-dcb "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:occurrent-command-dispatch-dcb:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="occurrent-command-dispatch-dcb" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}
