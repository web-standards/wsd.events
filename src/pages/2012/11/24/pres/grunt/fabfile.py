from __future__ import with_statement
from fabric.api import *
from fabric.contrib.files import exists

env.use_ssh_config = True
env.hosts = ['locum']
REPO = 'git@bitbucket.org:sapegin/grunt-talk.git'
DEST = 'projects/sapegin/htdocs/subprojects/pres/grunt'


@task(default=True)
def deploy():
	if exists(DEST):
		with cd(DEST):
			run('git checkout master')
			run('git pull')
	else:
		run('git clone %s %s' % (REPO, DEST))
