package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pusher/pusher-http-go"
)

func main() {
	app := fiber.New()

	// Cors Policy
	app.Use(cors.New())

	pusherClient := pusher.Client{
		AppID:   "1318713",
		Key:     "079e2e0561be89d9d5eb",
		Secret:  "c87407707781e22d446e",
		Cluster: "ap2",
		Secure:  true,
	}

	app.Post("/api/messages", func(c *fiber.Ctx) error {
		var data map[string]string

		if err := c.BodyParser(&data); err != nil {
			return err
		}

		pusherClient.Trigger("channel", "message", data)

		return c.JSONP([]string{})
	})

	app.Listen(":8080")
}
