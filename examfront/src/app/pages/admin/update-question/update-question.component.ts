import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(private _route:ActivatedRoute,
    private _question:QuestionService,
    private _router:Router) { }

  public Editor = ClassicEditor;  
  quesId=0;
  question:any;

  ngOnInit(): void {
    this.quesId=this._route.snapshot.params['quesid'];
    //alert(this.quesId);
    this._question.getQuestion(this.quesId).subscribe(
      (data:any)=>{
        this.question=data;
        console.log(this.question);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  //update form submit
  public updateData(){
    //validate

    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success!','Question Upadted','success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error!','Error in updating quiz','error');
        console.log(error);
      }
    );
  }

}
