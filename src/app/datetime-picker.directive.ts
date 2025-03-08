import { Directive, ElementRef, OnInit } from '@angular/core';
import * as tempusDominus from '@eonasdan/tempus-dominus';

@Directive({
  selector: '[appDatetimePicker]',
  standalone: true,
})
export class DatetimePickerDirective implements OnInit {
  constructor(private el: ElementRef) {}
  ngOnInit() {
    new tempusDominus.TempusDominus(this.el.nativeElement, {
      display: {
        components: {
          decades: true,
          year: true,
          month: true,
          date: true,
          hours: true,
          minutes: true,
          seconds: false,
        },
      },
    });
  }
}
