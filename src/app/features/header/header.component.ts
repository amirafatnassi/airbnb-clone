import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    //generate airbnb form
    this.form = new FormGroup({
      where: new FormControl('', Validators.compose([Validators.required])),
      arrivalDate: new FormControl(
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
    this.segmentVisible = 'arrivalDate';
  }

  //set dates option
  setDates($event: any, key: string) {
    const {
      detail: { value },
    } = $event;
    if (!value) {
      return;
    }
    if (key === 'form') {
      this.form?.patchValue({
        arrivalDate: value,
      });
    } else {
      this.form?.patchValue({
        departureDate: value,
      });
    }
  }

  //build search query
  search() {
    const queryParams = this.form
      ? {
          ...this.form.value,
          ...this.form.value?.who,
        }
      : {};
    //check value
    console.log(queryParams);
    //navigate to search page
    this._router.navigate(['/s'], { queryParams });
  }
}
