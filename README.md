# TypeWriterJS
### A **simple** and **elegant** typewriter effect built in pure Javascript.

To include TypewriterJS in your application, you can either fork this repository, or simply include it from jsdelivr in a script tag!

    <script src="https://cdn.jsdelivr.net/gh/stormageddon/TypeWriterJS/typewriter.js"></script>

Using TypewriterJS is incredibly simple.

    <script>
        const tw = new TypeWriter('typewriter', { cursor: '_' });
        tw.typeStr('Developer', { delay: 300 })
          .wait(1000)
          .remove(9)
          .typeStr('Architect', { delay: 300 })
          .wait(1000)
          .remove(9)
          .typeStr('Entrepreneur', { delay: 300 })
          .wait(1000)
          .remove(12)
          .typeStr('Problem Solver', { delay: 300 })
          .wait(1000)
          .remove(14)
          .typeStr('Engineer', { delay: 300 })
          .wait(1000)
          .remove(8)
          .go(true)
      </script>

