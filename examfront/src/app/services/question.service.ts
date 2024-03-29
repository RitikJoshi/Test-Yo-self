import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http:HttpClient
  ) { }

  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }
  //add question
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  public getQuestionsOfQuizForTest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //delete question
  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //get single question
  public getQuestion(questionId:any){
    return this._http.get(`${baseUrl}/question/${questionId}`);
  }

  //update question
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  //eval quiz
  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
