import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() public ionContent!: IonContent;
  @Input() public places!: any[];
  public segmentVisible!: string;
  public form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    //generate airbnb form
    this.form = new FormGroup({
      where: new FormControl('', Validators.compose([Validators.required])),
      arivalDate: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      departureDate: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      who: new FormGroup({
        adultCount: new FormControl(0),
        childrenCount: new FormControl(0),
        babyCount: new FormControl(0),
      }),
    });
  }

  async activate(segmentName: string) {
    this.segmentVisible = segmentName;
  }

  //Set where option
  setWhere(value: string) {
    if (!this.form) {
      return;
    }
    this.form.patchValue({ where: value });
    this.segmentVisible = 'arivalDate';
  }

  //set dates option
  setDates($event: any, inputEl: string) {
    const {
      detail: { value },
    } = $event;
    if (!value) {
      return;
    }
    if (inputEl === 'form') {
      this.form?.patchValue({
        arivalDate: value,
      });
    } else {
      this.form?.patchValue({
        departureDate: value,
      });
    }
  }
}
