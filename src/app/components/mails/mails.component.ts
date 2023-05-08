import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Mail } from 'src/app/models/mail/Mail';
import { SupportService } from 'src/app/services/support/support.service';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit {
  mails: Mail[];
  constructor(private supportService:SupportService, private toastrService:ToastrService){}
  ngOnInit(): void {
    this.getMails();
  }

  getMails() {
    this.supportService.getMails().subscribe(response=>{
      response.success ? this.mails = response.data : this.toastrService.error("Bir hata meydana geldi","HATA");
      console.log(this.mails);
      
    })
  }

  deleteMail(id:string) {
    if(confirm("Mail'i silmek istediğinizden emin misiniz ? ")) {
      this.supportService.deleteMail(id).subscribe(response=>{
        response.success ? this.toastrService.success("Mail Başarıyla Slindi","Başarılı") : this.toastrService.error("Bir hata meydana geldi","HATA");
        this.getMails();
      })
    }
  }

}
