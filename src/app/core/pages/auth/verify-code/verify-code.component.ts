import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialIconsComponent } from "../components/ui/social-icons/social-icons.component";
import { CustomInputComponent } from "../components/ui/custom-input/custom-input.component";

@Component({
  selector: 'app-verify-code',
  imports: [RouterLink, SocialIconsComponent, CustomInputComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
})
export class VerifyCodeComponent {}
