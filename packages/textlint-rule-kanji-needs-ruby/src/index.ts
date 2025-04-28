import { TxtParagraphNode } from "@textlint/ast-node-types";
import type { TextlintRuleModule } from "@textlint/types";
import { parseFragment, DefaultTreeAdapterTypes } from "parse5";

function walk(
  node: DefaultTreeAdapterTypes.Node,
  callback: (node: DefaultTreeAdapterTypes.Node) => void
) {
  callback(node);
  if ("childNodes" in node && node.childNodes) {
    node.childNodes.forEach((child) => walk(child, callback));
  }
}

function containsKanji(text: string): boolean {
  return /\p{Script=Han}/u.test(text);
}

function hasRubyAncestor(node: DefaultTreeAdapterTypes.ChildNode): boolean {
  let current = node.parentNode;
  while (current) {
    if (current.nodeName === "ruby" && hasRTChild(current)) {
      return true;
    }
    if ("parentNode" in current) {
      current = current.parentNode;
    } else {
      return false;
    }
  }
  return false;
}

function hasRTChild(rubyNode: DefaultTreeAdapterTypes.ParentNode): boolean {
  return rubyNode.childNodes.some((child) => child.nodeName === "rt");
}

const rule: TextlintRuleModule = (context) => {
  const { Syntax, getSource, report, RuleError } = context;

  function checkNode(markdownNode: TxtParagraphNode) {
    const rawText = getSource(markdownNode);
    const documentFragment = parseFragment(rawText);

    walk(documentFragment, (htmlNode) => {
      if (htmlNode.nodeName === "#text" && "value" in htmlNode) {
        if (containsKanji(htmlNode.value)) {
          if (!hasRubyAncestor(htmlNode)) {
            report(
              markdownNode,
              new RuleError(`「${htmlNode.value}」にルビを振ってください`, {
                index: 0,
              })
            );
          }
        }
      }
    });
  }

  return {
    [Syntax.Paragraph](node) {
      checkNode(node);
    },
  };
};

export default rule;
