import { fakeAsync, flush, tick } from "@angular/core/testing";

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
});
