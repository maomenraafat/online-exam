import { TestBed } from '@angular/core/testing';

import { QuizAdaptorService } from './quiz-adaptor.adaptor';

describe('QuizAdaptorService', () => {
  let service: QuizAdaptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizAdaptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
