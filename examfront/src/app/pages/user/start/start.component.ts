import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid;
  questions;

  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit=false;

  timer:any;

  constructor(
    private _locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _quiz:QuizService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  preventBackButton(){
    history.pushState(null,'',location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
  }
  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;

        this.timer=this.questions.length*1*60;
        
        this.questions.forEach((q) => {
          q['givenAnswer']='';
        });
        console.log(this.questions);
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading question of quiz",'error');
      }
    );
  }
  
  submitQuiz(){
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed){
        this.evalQuiz();
      }
    });
  }

  startTimer(){
    let t:any=window.setInterval(()=>{
      //code
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min: ${ss} sec`;
  }

  evalQuiz(){
    //calculation

    //call to server to check questions
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{
        console.log(data);

        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      (error)=>{
        console.log(error);
      }
    );

    // this.isSubmit=true;

    // this.questions.forEach(q=>{
    //   if(q.givenAnswer==q.answer){
    //     this.correctAnswers++;
    //     let marksSingle=
    //       this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot+=marksSingle;
    //   }

    //   if(q.givenAnswer.trim() != ''){
    //     this.attempted++;
    //   }
    // });
    // console.log("Correct Answers: "+this.correctAnswers);
    // console.log("Marks got: "+this.marksGot);
    // console.log("Attempted: "+this.attempted);
    // console.log(this.questions);
  }

  printPage(){
    window.print();
  }
}
