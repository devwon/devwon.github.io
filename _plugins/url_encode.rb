# _plugins/url_encode.rb
require 'liquid'
# require 'uri'
require 'cgi'

# Percent encoding for URI conforming to RFC 3986.
# Ref: http://tools.ietf.org/html/rfc3986#page-12
module URLEncode
  def url_encode(url)
    # ruby 1.9.2 부터 liquid URI escape deprecated되어서 CGI escape 방식 사용
    # return URI.escape(url, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
    return CGI::escape(url)
  end
end

Liquid::Template.register_filter(URLEncode)