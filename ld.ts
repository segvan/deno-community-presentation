const path = Deno.args[0];

if (!path) {
  console.log(`\n     Directory path argument required! \n`);
  Deno.exit(1);
}

try {
  const pathInfo = await Deno.stat(path);

  if (!pathInfo.isDirectory) {
    throw new Error("Not a directory!");
  }

  console.log(`\n     Directory: ${path}\n`);

  for await (const item of Deno.readDir(path)) {
    if (item.isDirectory) {
      console.log(`* ${item.name}`);
    } else if (item.isFile) {
      console.log(`- ${item.name}`);
    }
  }
} catch (exc) {
  console.error(exc.message);
}

console.log("\n");
