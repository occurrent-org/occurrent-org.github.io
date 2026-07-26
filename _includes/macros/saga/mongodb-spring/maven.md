{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-saga-dsl-mongodb-spring</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:occurrent-saga-dsl-mongodb-spring:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "occurrent-saga-dsl-mongodb-spring" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='occurrent-saga-dsl-mongodb-spring', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/occurrent-saga-dsl-mongodb-spring "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:occurrent-saga-dsl-mongodb-spring:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="occurrent-saga-dsl-mongodb-spring" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}