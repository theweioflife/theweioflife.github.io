import { describe, expect, it } from "vitest";
import { sanitizeHtml, stripHtml } from "./sanitize";

describe("sanitizeHtml", () => {
  it("removes script tags and unsafe event handlers", () => {
    const result = sanitizeHtml('<p>Hello</p><script>alert(1)</script><img src="x.jpg" onerror="alert(1)">');

    expect(result).toContain("<p>Hello</p>");
    expect(result).not.toContain("<script>");
    expect(result).not.toContain("onerror");
  });

  it("removes javascript links and keeps safe links", () => {
    const result = sanitizeHtml('<a href="javascript:alert(1)">bad</a><a href="https://example.com">safe</a>');

    expect(result).not.toContain("javascript:");
    expect(result).toContain('href="https://example.com"');
  });

  it("adds rel to external links opened in a new tab", () => {
    const result = sanitizeHtml('<a href="https://example.com" target="_blank">safe</a>');

    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it("keeps safe images and strips text content", () => {
    const html = '<figure><img src="https://example.com/a.jpg" alt="描述" width="300" height="200"></figure>';

    expect(sanitizeHtml(html)).toContain('alt="描述"');
    expect(stripHtml("<p>  測試 <strong>內容</strong></p>")).toBe("測試 內容");
  });

  it("adds image alt fallback when WordPress leaves alt empty", () => {
    const result = sanitizeHtml('<img src="https://example.com/a.jpg" alt="">', "文章圖片");

    expect(result).toContain('alt="文章圖片"');
  });
});
