import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Palette, Save } from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
    bio: "",
    website: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    comments: true,
    likes: true,
    follows: true,
  });

  const handleSave = () => {
    localStorage.setItem("userName", profile.name);
    localStorage.setItem("userEmail", profile.email);
    // In a real app, this would save to the backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your profile details and bio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xl">
                      {profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="border-slate-600 text-slate-300">
                      Change Photo
                    </Button>
                    <p className="text-sm text-slate-500 mt-1">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="bg-slate-900/50 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="bg-slate-900/50 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-slate-300">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    placeholder="Write a short bio about yourself..."
                    className="bg-slate-900/50 border-slate-600 text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="website" className="text-slate-300">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                    placeholder="https://your-website.com"
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Email Notifications</Label>
                    <p className="text-sm text-slate-400">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Comments</Label>
                    <p className="text-sm text-slate-400">When someone comments on your articles</p>
                  </div>
                  <Switch
                    checked={notifications.comments}
                    onCheckedChange={(checked) => setNotifications({...notifications, comments: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Likes</Label>
                    <p className="text-sm text-slate-400">When someone likes your content</p>
                  </div>
                  <Switch
                    checked={notifications.likes}
                    onCheckedChange={(checked) => setNotifications({...notifications, likes: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">New Followers</Label>
                    <p className="text-sm text-slate-400">When someone follows you</p>
                  </div>
                  <Switch
                    checked={notifications.follows}
                    onCheckedChange={(checked) => setNotifications({...notifications, follows: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                  <Palette className="h-4 w-4 mr-2" />
                  Theme Settings
                </Button>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Articles Published</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Views</span>
                  <span className="text-white font-semibold">3.2K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Followers</span>
                  <span className="text-white font-semibold">148</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Following</span>
                  <span className="text-white font-semibold">89</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}