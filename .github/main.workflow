workflow "Test" {
  on = "push"
  resolves = ["Test"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Install" {
  needs = "Build"
  uses = "actions/npm@master"
  args = "test"
}
