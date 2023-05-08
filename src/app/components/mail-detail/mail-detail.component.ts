import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mail } from 'src/app/models/mail/Mail';
import { SupportService } from 'src/app/services/support/support.service';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.css']
})
export class MailDetailComponent implements OnInit {
  mailId:string;
  mail:Mail;
  constructor(private route:ActivatedRoute,private supportService:SupportService,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.getMailId();
    this.getMailDetails();
  }


  getMailId() {
    this.mailId = this.route.snapshot.paramMap.get('id');
  }

  getMailDetails() {
    this.supportService.getMailByMailId(this.mailId).subscribe(response=>{
      response.success ? this.mail = response.data : this.toastrService.error("Bir hata meydana geldi.","HATA")
      console.log(this.mail);
      
    })
  }

}
