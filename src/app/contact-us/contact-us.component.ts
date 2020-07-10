import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations/fade-in';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '../animations/all-animation';
import { PortfolioService } from '../shared/services/portfolio/portfolio.service';

@Component({
  selector: 'app-contact-us',
  animations: [fadeIn, mainAnimations],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  contact: IContactInput;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: PortfolioService
  ) { this.contact = <IContactInput>{}; }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'subject': [null, Validators.compose([Validators.required])],
      'name': [null, Validators.compose([Validators.required])],
      'message': [null, Validators.compose([Validators.required])]
    });

    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  onSubmit() {
    this.commonService.postToSheets(this.contactForm.value).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    })
  }

}

interface IContactInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
}
