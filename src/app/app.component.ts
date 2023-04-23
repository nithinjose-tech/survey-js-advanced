import { Component } from '@angular/core';
import { Model } from "survey-core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const surveyJson = {
  "title": "IV",
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "question1",
          "title": "Name"
        },
        {
          "type": "text",
          "name": "question2"
        },
        {
          "type": "text",
          "name": "question3"
        },
        {
          "type": "text",
          "name": "question4"
        },
        {
          "type": "text",
          "name": "question5"
        },
        {
          "type": "text",
          "name": "question6",
          "title": "Roll No"
        },
        {
          "type": "text",
          "name": "question7"
        },
        {
          "type": "text",
          "name": "question8"
        },
        {
          "type": "text",
          "name": "question9"
        },
        {
          "type": "text",
          "name": "question10"
        },
        {
          "type": "text",
          "name": "question11"
        },
        {
          "type": "text",
          "name": "question12"
        },
        {
          "type": "text",
          "name": "question13"
        },
        {
          "type": "text",
          "name": "question14"
        }
      ],
      "id": 1
    }
  ]
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  surveyItems:any

  constructor(private http: HttpClient) { }


  title = 'get-started-creator-angular';
  surveyModel!: Model;

  surveyComplete (sender:any) {
    saveSurveyResults(
      "http://localhost:5000/data",
      sender.data
    )
  }

  

  alertResults (sender:any) {
    const results = JSON.stringify(sender.data);
    alert(results);
  }
  
  ngOnInit() {

    this.http.get<any>('http://localhost:5000/forms/').subscribe((data: any) => {
        console.log(`Data:${JSON.stringify(data[0])}`)
       

        const survey = new Model(data[0]);
        survey.onComplete.add(this.surveyComplete);
        survey.onComplete.add(this.alertResults);
        this.surveyModel = survey;
  });
    


   
  }
}

function saveSurveyResults(url:any, json:any) {
  const request = new XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.addEventListener('load', () => {
    // Handle "load"
  });
  request.addEventListener('error', () => {
    // Handle "error"
  });
  request.send(JSON.stringify(json));
}
