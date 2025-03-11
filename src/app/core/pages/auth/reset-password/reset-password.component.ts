import { Component } from '@angular/core';
import { SocialIconsComponent } from "../components/ui/social-icons/social-icons.component";
import { CustomInputComponent } from "../components/ui/custom-input/custom-input.component";

@Component({
  selector: 'app-reset-password',
  imports: [SocialIconsComponent, CustomInputComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

}
