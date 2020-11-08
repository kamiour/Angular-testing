import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async testing examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log("running assertions");
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Asynchronous text example - setTimeout()", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000);

    // tick(500);
    // tick(499);
    // tick(1); // 1000 (equal to setTimeout delay) in total

    flush(); // execuring all the async operations

    expect(test).toBeTruthy();
  }));

  it("Asynchronous text example - plain Promise", fakeAsync(() => {
    let test = false;

    console.log("creating Promise");

    Promise.resolve().then(() => {
      test = true;
      console.log("Promise evaluated successfully");
    });

    flushMicrotasks();

    console.log("Running test assertions");

    expect(test).toBeTruthy();
  }));

  it("Asynchronous text example - Promise + setTimeout", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(11);
  }));

  it("Asynchronous text example - Observables", fakeAsync(() => {
    let test = false;

    console.log("creating Observable");

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    console.log("running test assertions");
    expect(test).toBeTruthy();
  }));
});
