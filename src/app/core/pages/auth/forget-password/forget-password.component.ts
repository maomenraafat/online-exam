import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialIconsComponent } from "../components/ui/social-icons/social-icons.component";
import { CustomInputComponent } from "../components/ui/custom-input/custom-input.component";

@Component({
  selector: 'app-forget-password',
  imports: [RouterLink, SocialIconsComponent, CustomInputComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {}
