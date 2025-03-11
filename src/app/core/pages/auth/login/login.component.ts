import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialIconsComponent } from "../components/ui/social-icons/social-icons.component";
import { CustomInputComponent } from "../components/ui/custom-input/custom-input.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, SocialIconsComponent, CustomInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
