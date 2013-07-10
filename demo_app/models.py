#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.db import models
import os,tarfile
from datetime import datetime


        
class Groupe(models.Model):
    name = models.CharField(max_length = 255)
    date = models.DateField()
    version = models.CharField(max_length = 255)
    
    def __unicode__(self):
        return self.name

class Fichier(models.Model):
    name = models.CharField(max_length = 255)
    content = models.TextField()
    groupe = models.ForeignKey(Groupe)
    
    def __unicode__(self):
        return self.name

class Politique(models.Model):
    name = models.CharField(max_length = 255)

    def __unicode__(self):
        return self.name

class FichierPolitique(models.Model):
    name = models.CharField(max_length = 255)
    politique = models.ForeignKey(Politique)
    fichier = models.ForeignKey(Fichier)

    def __unicode__(self):
        return self.name

class IgnoreRules(models.Model):
    name = models.CharField(max_length = 255)
    rules_number = models.IntegerField()
    fichier_politique = models.ForeignKey(FichierPolitique)

    def __unicode__(self):
        return self.name

class MoveFilesIntoDB:
    def __init__(self):
        """Cree un nouveau groupe"""
        self.g=Groupe(name="g",date=datetime.now(),version="unknown_version")
        self.g.save()
        print "Groupe created"
        
    def walk_dir(self, path = '/srv/www/mod_intf/interface_mod_sec/rules_dir/tmp'):
        """parcoure recursivement le path et lance la fonction d'ajout pour tous les fichiers"""
        for root, dirs, files in os.walk('/srv/www/mod_intf/interface_mod_sec/rules_dir/tmp'):
            for each_file in files:
                print root+"/"+ each_file
                self.move_files_to_db(path_file =root+"/"+each_file, file_name=each_file)
        return True

    def move_files_to_db(self, path_file, file_name):
        """Ajoute à la db le fichier passé en paramètre"""
        f=open(path_file, "r")
        self.g.fichier_set.create(name=file_name,content=f.read(),groupe=self.g)
        f.close()
        return True

    @staticmethod
    def extract_archive(path = 'rules_dir/mod_secu_rules.tgz'):
        """extrait une archive"""
        destination_path = 'rules_dir/tmp/'
        a = tarfile.open(path)
        a.extractall(destination_path)
        a.close()
        return True


