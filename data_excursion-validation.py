# -*- coding: utf-8 -*-
"""
Created on Mon Mar 30 17:45:21 2020

@author: Arda
"""

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import csv
#count the number of temporally misplaced data
with open("C:/Users/arda/Bachelorarbeit/meindorf_DB_remote.csv", "r") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    data = list(csv_reader)
    misplacedEntries=[]
    misplacedCount=0
    previousTimestamp=0
    diff=[]
    data.pop(0)
    previousclick=[]
    wrongclick=[]
    wrongClickedOn=0
    wrongClickedAway=0
    #list of HTML Elements on the page of neue Anzeige, that have a clickedAway event attached to them
    clickables=['themaTextfield','inhaltTextfield','schlagworteTextfield','offer_photo_copyright','mapid',
               'ortTextfield','gueltigTextfield','mySlider','anzeigeFeedback','angebotFeedback',
               'themaFeedback','inhaltFeedback','schlagworteFeedback','fotoFeedback',
               'ortFeedback','gueltigFeedback','chiffreCheckbox','chiffreFeedback',
               'vertretungCheckbox','vertretungFeedback','aufgabeBttn']
    clickon=0
    clickawy=0
    clickEntries=[]
  
    for i in data:
        #if the timestamp of the current entry is smaller than the previous one
        if(int(i[3])<previousTimestamp):
            #add the timestamps of the current and previous entries to the array
            misplacedEntries.append([i[0],i[1],previousTimestamp,int(i[3])])
            #add the difference between the timestamps to the array
            diff.append (previousTimestamp-int(i[3]))
            misplacedCount+=1
        previousTimestamp=int(i[3])
        #add click events to a list 
        if (i[1]=='clickedOn'):
            clickEntries.append(i)
        elif (i[1]=='clickedAway'): 
            clickEntries.append(i)
    
    #find missing click entries
    for i in clickEntries:
        
        #find missing clickedAway entries
        if (i[1]=='clickedOn'):
            clickon+=1;
            if(len(previousclick)==0 or previousclick[1]=="clickedOn"  and previousclick[2] not in clickables):
                previousclick=i
                continue;
            #if two consecutive clickedOn entries don't share the same elemend ID
            #that means a clickedAway event after the first clickedOn event is possibly missing
            elif(previousclick[1]=='clickedOn' and previousclick[2]!=i[2]):
                wrongclick.append([previousclick,i]);
                wrongClickedOn+=1
        #find missing clickedOn entries
        elif (i[1]=='clickedAway'): 
            clickawy+=1;
            #if there are two consecutive clickedAway that means a clickedon event preceding the second entry is possibly missing
            if(previousclick[1]=='clickedAway'):
                wrongclick.append([previousclick,i]);
                wrongClickedAway+=1
        previousclick=i;

    #order the timestamp differences in a descending order
    diff2= sorted(diff, key=int, reverse=True)
  
   
     