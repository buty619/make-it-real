
var filesystem = {
  type: "folder",
  name: "root",
  files: [
    {
      type: "folder",
      name: "Users",
      files: [
        {
          type: "folder",
          name: "Music",
          files: [
            { type: "file", name: "song1.mp3" },
            { type: "file", name: "song2.mp3" },
            { type: "file", name: "song3.mp3" }
          ]
        },
        {
          type: "folder",
          name: "Projects",
          files: [
            { type: "file", name: "project1.rb" },
            { type: "file", name: "project2.js" },
            {
              type: "folder",
              name: "project3",
              files: [
                { type: "file", name: "index.js" }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "folder",
      name: "Library",
      files: [
        { type: "file", name: "README.txt" }
      ]
    }
  ]
}

$(document).ready(function () {
  search();
  $('.fa-folder-open').on("click",function(){
    $(this).next().toggleClass("hide");
  });
})

function search() {  
  $('body').append(recursiveSearch(filesystem));
}

function recursiveSearch(root) {
  let out = "<li>"
  if (!root.name) {
    return
  }
  if (root.type === "folder") {
    out = out + "<i class=\"fas fa-folder-open\"></i> " + root.name;
    out = out + "<ul>";
    for (let i = 0; i < root.files.length; i++) {
      out = out + recursiveSearch(root.files[i]);
    }
    out = out + "</ul>"
  }
  if (root.type === "file") {
    out = out + "<i class=\"fas fa-file\"></i> " + root.name;
  }
  out = out + "</li>"
  return out;
}

