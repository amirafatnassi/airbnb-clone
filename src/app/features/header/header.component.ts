import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {


  //get search-bar html element reference
  @ViewChild('searchbar', { static: true, read: ElementRef })
  public searchbar!: ElementRef<HTMLIonRowElement>;

  @Input() public ionContent!: IonContent;
  @Input() public places!: any[];
  public segmentVisible!: string | undefined;
  public form!: FormGroup;

  constructor(
    private readonly _router: Router,
    private _ref: ElementRef<HTMLElement>
  ) {
    this.segmentVisible = 'places';
  }

  ngOnInit(): void {
    //generate airbnb form
    this.form = new FormGroup({
      where: new FormControl('', Validators.compose([Validators.required])),
      arrivalDate: new FormControl('', Validators.compose([Validators.required])),
      departureDate: new FormControl('', Validators.compose([Validators.required])),
      who: new FormGroup({
        adultCount: new FormControl(0),
        childrenCount: new FormControl(0),
        babyCount: new FormControl(0),
      }),
    });
  }


  ngAfterViewInit(): void {
    if (!this.ionContent?.scrollEvents) {
      this._ref.nativeElement.classList.add('scrolled');
      this._ref.nativeElement.classList.add('static');
      return;
    }
    this.ionContent.scrollEvents = true;
    this.ionContent.ionScroll.subscribe(($event) => {
      this.scrolling($event);
    });
  }

  scrolling($event: any) {
    const { detail: { scrollTop = 0 } = {} } = $event;
    if (!this._ref?.nativeElement) { return; }
    if (scrollTop > 5) {
      this._ref.nativeElement.classList.add('scrolled');
      this.segmentVisible = undefined;
      if (this.searchbar) this.searchbar.nativeElement.classList.remove('active');
    } else { }
  }

  async activate(segmentName: string) {
    this.segmentVisible = segmentName;
  }

  async backHome() {
    this._router.navigate(['./']);
  }

  //set where option
  setWhere(value: string) {
    if (!this.form) { return; }
    this.form.patchValue({ where: value });
    this.segmentVisible = 'arrivalDate';
  }

  //set dates option
  setDates($event: any, key: string) {
    const {
      detail: { value },
    } = $event;
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
    const queryParams = this.form ? {
      ...this.form.value,
      ...this.form.value?.who
    } : {};
    //chech value
    console.log(queryParams);
    //navigate to search page
    this._router.navigate(['/s'], { queryParams });
  }
}
