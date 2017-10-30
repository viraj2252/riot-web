FROM jwilder/docker-gen

#VOLUME /home/ubuntu/webapp/templates

ADD ./templates/nginx.tmpl /etc/docker-gen/templates/nginx.tmpl