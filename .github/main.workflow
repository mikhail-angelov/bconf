workflow "Test action" {
  resolves = ["Test"]
  on = "push"
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Install server" {
  uses = "actions/npm@master"
  args = "install --prefix ./server"
}

action "Install client" {
  uses = "actions/npm@master"
  args = "install --prefix ./client"
}

action "Test" {
  uses = "actions/npm@master"
  needs = ["Install","Install server"]
  args = "test"
}
