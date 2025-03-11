import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialIconsComponent } from "../components/ui/social-icons/social-icons.component";
import { CustomInputComponent } from "../components/ui/custom-input/custom-input.component";

@Component({
  selector: 'app-register',
  imports: [RouterLink, SocialIconsComponent, CustomInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {}
